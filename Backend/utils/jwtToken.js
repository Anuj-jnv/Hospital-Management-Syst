export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      
    })
    .json({
      success: true,
      message,
      user,
    });
};