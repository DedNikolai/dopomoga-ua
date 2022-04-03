package gameforfun.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Hello {

  @GetMapping("/app/hello")
  public String helloWorld() {
    return "Hello new app";
  }
}
