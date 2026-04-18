package com.example.apiaulas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ApiAulasApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiAulasApplication.class, args);
	}

}
