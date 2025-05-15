const express = require('express');
const router = express.Router();
const data = {};
data.employees = require('../../data/employees.json');


router.route('/')
    .get((req, res) => {
        if(data.employees) {
            res.json(data.employees);
        }
        else {
            res.status(404).json({error: "Employees not found"});
        }
        
    })
    .post((req, res) => {
        if (!req.body.firstname || !req.body.lastname) {
            res.status(400).send("Inputs not found")
        }
        else {
            const id = data.employees.length ? data.employees.length + 1 : 1;
            const newEmployee = {
                id,
                "firstname": req.body.firstname,
                "lastname": req.body.lastname
            }
            const allEmployees = [
                ...data.employees, newEmployee
            ]
            data.employees = allEmployees;
            res.status(201).json({
                message: "New employee created successfully",
                employee: newEmployee
            });
        }
    })
    .put((req, res) => {
       const employee = data.employees.find(emp => emp.id === req.body.id);

       if(!employee) {
        res.status(404).json({error: "Employee not found"});
       }

       // Update the found employee
        employee.firstname = req.body.firstname;
        employee.lastname = req.body.lastname;

        res.json(employee);
    
        
    })
    .delete((req, res) => {
            const findEmployee = data.employees.find(emp => emp.id === req.body.id);

            if (findEmployee) {
                const employee = data.employees.filter(emp => emp.id !== req.body.id);
                return res.json(employee);
            }
            else {
                res.status(404).json({error: "Employee not found"});
            }  
    });

    router.route('/:id')
        .get((req, res) => {
            const findEmployee = data.employees.find(emp => emp.id === Number(req.params.id));

            if (findEmployee) {
                return res.json(findEmployee);
            }
            else {
                res.status(404).json({error: "Employee not found"});
            }  
        })
    
module.exports = router;