package dopomogaua.dto.request;

import lombok.Data;

@Data
public class PasswordRequest {
  private String token;
  private String password;
}
