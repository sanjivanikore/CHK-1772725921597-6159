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
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;
public class HomeActivity extends AppCompatActivity {
    Button btnDetection, btnDashboard;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);

        setContentView(R.layout.activity_home);
        btnDetection = findViewById(R.id.btnDetection);
        btnDashboard = findViewById(R.id.btnDashboard);
        // Detection Button
        btnDetection.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(HomeActivity.this, DetectionActivity.class);
                startActivity(intent);
            }
        });

        // Dashboard Button
        btnDashboard.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(HomeActivity.this, DashboardActivity.class);
                startActivity(intent);
            }
        });

    }
}