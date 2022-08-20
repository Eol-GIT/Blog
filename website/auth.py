from flask import Blueprint, render_template, request, redirect, url_for, Response
from .models import Author
from werkzeug.security import check_password_hash
from flask_login import login_user, login_required, logout_user


auth = Blueprint('auth', __name__)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

@auth.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.json["email"]
        password = request.json["password"]

        user = Author.query.filter_by(email=email).first()

        if not user or not check_password_hash(user.password, password):
            return Response("error", 401)

        login_user(user, remember=True)
        return redirect(url_for('dashboard.admin'))
    return render_template('admin/login.html', )