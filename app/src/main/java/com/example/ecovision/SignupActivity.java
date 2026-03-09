package com.example.ecovision;

import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import android.os.Bundle;
import android.widget.*;
import androidx.appcompat.app.AppCompatActivity;

public class SignupActivity extends AppCompatActivity {
    EditText email, password;
    Button signupBtn;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_signup);
        email = findViewById(R.id.newEmail);
        password = findViewById(R.id.newPass);
        signupBtn = findViewById(R.id.signupBtn);
        signupBtn.setOnClickListener(v -> {
            Toast.makeText(this,"Account Created (Demo)",Toast.LENGTH_SHORT).show();
            finish();
        });

    }
}