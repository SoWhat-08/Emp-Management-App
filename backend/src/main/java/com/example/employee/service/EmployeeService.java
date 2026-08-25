package com.example.employee.service;
import com.example.employee.model.Employee;
import com.example.employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class EmployeeService {
  private final EmployeeRepository repo;
  public EmployeeService(EmployeeRepository repo){this.repo=repo;}
  public List<Employee> all(){return repo.findAll();}
  public Employee get(Long id){return repo.findById(id).orElseThrow();}
  public Employee save(Employee e){return repo.save(e);}
  public void delete(Long id){repo.deleteById(id);}
}
