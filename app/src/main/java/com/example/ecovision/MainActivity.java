package com.example.ecovision;

import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.*;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    EditText email, password;
    Button loginBtn;
    TextView signupLink;

    String demoEmail = "demo@gmail.com";
    String demoPass = "1234";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        email = findViewById(R.id.email);
        password = findViewById(R.id.password);
        loginBtn = findViewById(R.id.loginBtn);
        signupLink = findViewById(R.id.signupLink);
        loginBtn.setOnClickListener(v -> {

            String userEmail = email.getText().toString();
            String userPass = password.getText().toString();

            if(userEmail.equals(demoEmail) && userPass.equals(demoPass)){
                Toast.makeText(this,"Login Successful",Toast.LENGTH_SHORT).show();
                startActivity(new Intent(MainActivity.this, HomeActivity.class));
            }
            else{
                Toast.makeText(this,"Invalid Credentials",Toast.LENGTH_SHORT).show();
            }

        });

        signupLink.setOnClickListener(v -> {
            startActivity(new Intent(MainActivity.this, SignupActivity.class));
        });
    }
}