
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
    res.send('Hello');

};

const postUser = (req, res) => {
    const user = req.body;
    users.push(user)

    res.send(`User ${user.firstName}`);
};

export default {getUsers, postUser};
