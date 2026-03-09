package com.example.ecovision;

import android.os.Bundle;
import android.view.TextureView;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.Random;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DetectionActivity extends AppCompatActivity {

    TextureView cameraView;
    Button captureBtn;
    TextView resultText;

    DatabaseReference database;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detection);

        cameraView = findViewById(R.id.cameraView);
        captureBtn = findViewById(R.id.captureBtn);
        resultText = findViewById(R.id.resultText);

        database = FirebaseDatabase.getInstance().getReference("waste_data");

        captureBtn.setOnClickListener(v -> detectWaste());
    }

    private void detectWaste(){

        String[] types = {"plastic","paper","organic","metal"};

        int random = new Random().nextInt(4);

        String detected = types[random];

        resultText.setText("Detected Waste: " + detected);

        saveToFirebase(detected);
    }

    private void saveToFirebase(String type){

        String date = new SimpleDateFormat("yyyy-MM-dd").format(new Date());

        DatabaseReference ref = database.child(date).push();

        ref.setValue(type);
    }
}