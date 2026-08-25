package com.example.employee.controller;
import com.example.employee.model.Employee;
import com.example.employee.service.EmployeeService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/employees")
@CrossOrigin(origins="*")
public class EmployeeController {
  private final EmployeeService service;
  public EmployeeController(EmployeeService service){this.service=service;}
  @GetMapping public List<Employee> all(){return service.all();}
  @GetMapping("/{id}") public Employee get(@PathVariable Long id){return service.get(id);}
  @PostMapping public Employee create(@RequestBody Employee e){return service.save(e);}
  @PutMapping("/{id}") public Employee update(@PathVariable Long id,@RequestBody Employee e){e.setId(id);return service.save(e);}
  @DeleteMapping("/{id}") public void delete(@PathVariable Long id){service.delete(id);}
}
