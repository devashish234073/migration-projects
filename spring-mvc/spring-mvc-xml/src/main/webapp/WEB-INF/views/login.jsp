<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 50px; }
        .login-container { max-width: 400px; margin: 0 auto; }
        input { display: block; width: 100%; padding: 8px; margin: 10px 0; }
        button { width: 100%; padding: 10px; background-color: #4CAF50; color: white; }
    </style>
</head>
<body>
    <div class="login-container">
        <h1>Login</h1>
        <form method="POST" action="/login">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
        <p>Demo Credentials:</p>
        <p>Admin: admin / admin123</p>
        <p>User: user / user123</p>
    </div>
</body>
</html>
