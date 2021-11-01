package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.store.dao.AccountDAO;
import poly.store.dao.AuthorityDAO;
import poly.store.entity.Account;
import poly.store.entity.Authority;
import poly.store.service.AccountService;
import poly.store.service.AuthorityService;


@Service
public class AuthorityServiceImpl implements AuthorityService {
@Autowired
AuthorityDAO dao;
@Autowired
AccountDAO acdao;



public List<Authority> findAll() {
	// TODO Auto-generated method stub
	return dao.findAll();
}

public Authority create(Authority auth) {
	return dao.save(auth);
}

public void delete(Integer id) {
	dao.deleteById(id);
}
public List<Authority> findAuthoritiesOfAdministrators(){
	List<Account> accounts = acdao.getAdministrators();
	return dao.authoritiesOf(accounts);
}
}
