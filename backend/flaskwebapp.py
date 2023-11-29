import pandas as pd
from transformers import GPT2LMHeadModel, GPT2Tokenizer, Trainer, TrainingArguments
from transformers import DataCollatorForLanguageModeling, LineByLineTextDataset
import torch
import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template, request
from flask import current_app
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired
from flask_migrate import Migrate
from flask import Flask, request, jsonify, redirect, url_for
from flask import flash
import re
from wtforms.validators import DataRequired, ValidationError, EqualTo
from flask_cors import CORS



app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'State2244'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:suhas987@localhost/conversation_history'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

login_manager = LoginManager(app)
login_manager.login_view = 'login'

# Initialize Flask-Migrate
migrate = Migrate(app, db)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(15000), nullable=False)

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Log In')


class SignUpForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password', message='Passwords must match')])
    submit = SubmitField('Sign Up')

    def validate_password(self, password):
        # Password must have at least one uppercase letter, one lowercase letter,
        # one number, one symbol, and a minimum length of 8 characters.
        if (
            not re.search(r"[A-Z]", password.data) or
            not re.search(r"[a-z]", password.data) or
            not re.search(r"\d", password.data) or
            not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password.data) or
            len(password.data) < 8
        ):
            raise ValidationError("Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols.")

    def validate_confirm_password(self, confirm_password):
        if self.password.data != confirm_password.data:
            raise ValidationError("Passwords must match.")
    
    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError('Username is already in use. Please choose a different one.')


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    # Extract data from the JSON payload
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password_hash, password):
        login_user(user)
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()


    # Extract data from the JSON payload
    username = data.get('username')
    password = data.get('password')
    confirm_password = data.get('confirm_password')

    # Perform your signup logic
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'error': 'Username is already in use. Please choose a different one.'}), 400

    # If the username is unique, proceed with signup
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(username=username, password_hash=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    # Log in the new user
    login_user(new_user)

    return jsonify({'message': 'Signup successful'}), 200

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('You have been successfully logged out.', 'success')  # Add a flash message
    return redirect(url_for('index'))

class ConversationHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    question = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.String(15000, collation='utf8mb4_general_ci'), nullable=False)
    is_new_chat = db.Column(db.Boolean, default=False)


with app.app_context():
    db.create_all()

df = pd.read_csv('D:\KnowHive_GPT_Data\Field Engineer dataset.csv')
df = df.dropna()
input_data = df['Incident Description'].tolist()
target_data = df['Resolution Steps'].tolist()
with open("train.txt", "w") as f:
    for incident_desc, resolution_steps in zip(input_data, target_data):
        f.write(f"Incident Description: {incident_desc}\n")
        f.write(f"Resolution Steps: {resolution_steps}\n")
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
tokenizer.add_special_tokens({'pad_token': '[PAD]'})

# Define the training arguments
training_args = TrainingArguments(
    output_dir="./incident_model",
    overwrite_output_dir=True,
    num_train_epochs=1,
    per_device_train_batch_size=1,
    save_steps=10_000,
    save_total_limit=2,
    logging_dir="./logs",
)

# Check if a pre-trained model checkpoint exists and load it
if not os.path.exists(training_args.output_dir):
    model = GPT2LMHeadModel.from_pretrained("gpt2")

    # Fine-tune the model
    train_dataset = LineByLineTextDataset(
        tokenizer=tokenizer,
        file_path="train.txt",
        block_size=512,
    )

    data_collator = DataCollatorForLanguageModeling(
        tokenizer=tokenizer, mlm=False,
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        data_collator=data_collator,
        train_dataset=train_dataset,
    )

    # Start training
    trainer.train()

    # Save the fine-tuned model checkpoint
    trainer.save_model("./incident_model_checkpoint")

else:
    # Load the pre-trained model checkpoint
    model = GPT2LMHeadModel.from_pretrained("incident_model_checkpoint")

tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

def update_conversation_history(user_id, question, answer, is_new_chat=False):
    new_chat = ConversationHistory(user_id=user_id, question=question, answer=answer, is_new_chat=is_new_chat)
    db.session.add(new_chat)
    db.session.commit()

    
def save_conversation_history():
    pass  # No need to save to a file

def display_conversation_history():
    # Assuming current_user.id is the user_id
    user_id = current_user.id

    # Filter conversation history for the current user
    conversation_history = ConversationHistory.query.filter_by(user_id=user_id).all()

    history_str = ""
    for i, entry in enumerate(conversation_history, 1):
        history_str += f"{i}. Question: {entry.question}\n   Answer: {entry.answer}\n"

    return history_str
    
def format_sections(text):
    # Split the text into sentences
    sentences = [sentence.strip() for sentence in text.split('.') if sentence.strip()]

    # Skip the last incomplete sentence
    if len(sentences) > 1:
        sentences = sentences[:-1]

    # Extract the main heading
    main_heading = sentences[0].strip()

    # Format each sentence with a hyphen and a new line after the question mark
    formatted_output = f"{main_heading}:\n" + "\n".join([f"- {sentence.strip()}\n" if '?' in sentence else f"- {sentence.strip()}." for sentence in sentences[1:]])

    return formatted_output.strip()

def generate_answer(question):
    with app.app_context():
        input_text = question

        # Assuming current_user.id is the user_id
        user_id = current_user.id

    

        input_ids = tokenizer.encode(input_text, return_tensors='pt', max_length=50, truncation=True)
        attention_mask = torch.ones(input_ids.shape, dtype=torch.long) 
        response = model.generate(input_ids, max_length=100, num_return_sequences=1, no_repeat_ngram_size=2, top_k=50, top_p=0.95, temperature=0.7, do_sample=True, pad_token_id=model.config.eos_token_id)

        answer = tokenizer.decode(response[0], skip_special_tokens=True)

        # Post-process the answer using the format_sections function
        answer = format_sections(answer)

        # Update the conversation history with the generated answer
        update_conversation_history(user_id=user_id, question=question, answer=answer)

        return {'question': question, 'answer': answer}
@app.route('/')
@login_required
def index():
    conversation_history_str = display_conversation_history()
    return render_template('index.html', conversation_history=conversation_history_str)
@app.route('/ask', methods=['GET', 'POST'])
@login_required
def ask():
    if request.method == 'POST':
        new_incident_description = request.form['incident_description']
        new_answer = generate_answer(new_incident_description)

        save_conversation_history()
    

        # Fetch only the most recent conversation history entry for the user
        user_conversation_history = ConversationHistory.query.filter_by(user_id=current_user.id).order_by(ConversationHistory.id.desc()).first()
        if user_conversation_history:
            # Display only the answer of the current ask question
            return render_template('webpage.html', current_answer=new_answer["answer"])

    # If no question has been asked yet, render the template without displaying any answer
    return render_template('webpage.html', current_answer=None)


if __name__ == '__main__':
    app.run(debug=True)