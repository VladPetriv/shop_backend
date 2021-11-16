import crypto from 'crypto';

class PasswordUtils {
  algorithm = 'aes-256-cbc';
  initVector = crypto.randomBytes(16);
  Securitykey = crypto.randomBytes(32);

  hash(password) {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.Securitykey,
      this.initVector
    );
    let encodedPassword = cipher.update(password, 'utf8', 'hex');
    encodedPassword += cipher.final('hex');
    return encodedPassword;
  }
  decodePassword(password) {
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.Securitykey,
      this.initVector
    );
    let decodedPassword = decipher.update(password, 'hex', 'utf8');
    decodedPassword += decipher.final('utf8');
    return decodedPassword;
  }
  comparePassword(password, userPassword) {
    const encodedUserPassword = this.decodePassword(userPassword);
    if (encodedUserPassword === password) {
      return true;
    }
    return false;
  }
}

export default new PasswordUtils();
