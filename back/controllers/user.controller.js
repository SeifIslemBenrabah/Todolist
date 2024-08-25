const User =require('../modules/user.model')
const bcrypt =require('bcrypt')

const creatuser = async(req,res)=>{
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
         req.body.password = hashedPassword;
        const user = await User.create(req.body)
        res.status(200).json(User)
        console.log(req.body)
        console.log('user create!!')
    }catch(err){
        res.status(500).json({msg: err.msg})
        console.log('user do not create!!')
    }
}
const loginuser = async (req, res) => {
    try {
      const user = await User.findOne({ name: req.body.name });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(401).json({ msg: 'Incorrect password' });
      }
      res.status(200).json({ msg: 'Login successful', user });
      console.log('User logged in:', user);
    } catch (err) {
      res.status(500).json({ msg: err.message });
      console.log('Login failed:', err.message);
    }
  };
  
module.exports={
    creatuser,
    loginuser
}