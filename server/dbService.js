const { User } = require("./dbConnection");
/*export function CreateUser(values){
    var newUser = await User.create({
        FirstName: values.FirstName,
        LastName: values.LastName,
        Address: values.Address,
        OrganizationName: values.OrganizationName,
        Phone: values.Phone,
        Email: values.Email,
      });
      return newUser;

};*/

function createUsers(values)
{
    return new Promise(async (resolve,reject) =>
    {
        await User.create({
            FirstName: values.FirstName,
            LastName: values.LastName,
            Address: values.Address,
            OrganizationName: values.OrganizationName,
            Phone: values.Phone,
            Email: values.Email,
          }).then(results =>
            {
                if(results != null)
                {
                    resolve(results)
                }
                else
                    reject("User not created!!");
            })
            .catch(error => 
                {
                    reject(error);
                })   
    })
}

function getUsers()
{
    return new Promise(async (resolve,reject) =>
    {
        await User.findAll().then(results =>
            {
                if(results != null)
                {
                    resolve(results)
                }
                else
                    reject("Users not found!!");
            })
            .catch(error => 
                {
                    reject(error);
                })   
    })
}

function getOneUser(value)
{
    return new Promise(async (resolve,reject) =>
    {
        await User.findOne({
            where: {
              id: value.id,
            },
          }).then(results =>
            {
                if(results != null)
                {
                    resolve(results)
                }
                else
                    reject("User not found!!");
            })
            .catch(error => 
                {
                    reject(error);
                })   
    })
}

function updateUser(param, values)
{
    return new Promise(async (resolve,reject) =>
    {
        await User.update(
            {
              FirstName: values.FirstName,
              LastName: values.LastName,
              Address: values.Address,
              OrganizationName: values.OrganizationName,
              Phone: values.Phone,
              Email: values.Email,
            },
            {
              where: {
                id: param.id,
              },
            }
          ).then(results =>
            {
                if(results != null)
                {
                    resolve(results)
                }
                else
                    reject("User not updated!!");
            })
            .catch(error => 
                {
                    reject(error);
                })   
    })
}

function deleteUser(value)
{
    return new Promise(async (resolve,reject) =>
    {
        await User.destroy({
            where: {
              id: value.id,
            },
          }).then(results =>
            {
                if(results != null)
                {
                    resolve(results)
                }
                else
                    reject("User not deleted!!");
            })
            .catch(error => 
                {
                    reject(error);
                })   
    })
}

  
module.exports = { getUsers, createUsers, getOneUser, updateUser, deleteUser };
