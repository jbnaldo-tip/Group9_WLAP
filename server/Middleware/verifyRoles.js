// start of verifyRoles.js

const verifyRoles = (...allowRoles) => {
    return (req, res, next) => {

        if(!req?.Roles) return res.sendStatus(203);

        const rolesArray = [...allowRoles];
        console.log(rolesArray);

        console.log(req.roles);

        const result = req.Roles.map (Role => rolesArray.includes(Role)).find (val => val === true);

        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = [verifyRoles]