

import User from "../userPassReset/userModel.js";
import bcryptjs from "bcryptjs";


const users = [
    {
        firstName: "Lucky",
        lastName: "Doe",
        age: 25
    },
    {
        firstName: "Moise",
        lastName: "John",
        age: 45
    }

]

const getUsers = (req, res) => {
    console.log(users);
    res.send(users);

};

const postUser = (req, res) => {
    const user = req.body;
    console.log(user)
    users.push(user)

    res.send(user);
};

const forgot = async (req, res)=> {
    try {
      const exist = await User.findone({email: req.body.email});

      console.log("oooops: ", exist)
      return res.status(200).send(exist.email)
      if (exist.email) {
        const tokenid = generateToken({ id: exist.id }, '10m');
        const confirm = confirmEmail(tokenid);
        await nodemailer(
          exist.email,yield
          'reset password',
          'request for reset password',
          confirm
        );
        return res.status(200).json({
          status: 200,
          message: 'Password reset link has been sent to your email'
        });
      } else {
        res.status(404).json({ status: 404, message: 'Email has not found' });
      }
    } catch (error) {
      return res.status(500).send( error);
    }
  }







export default {getUsers, postUser, forgot};

