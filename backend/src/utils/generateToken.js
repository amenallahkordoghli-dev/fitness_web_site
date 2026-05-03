import jwt from 'jsonwebtoken';

export const generateToken=(user,res)=>{
    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    //envoyer cookie
    res.cookie("token", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax"
});
    return token;
}
