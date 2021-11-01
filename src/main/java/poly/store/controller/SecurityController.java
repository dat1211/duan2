package poly.store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SecurityController {
@RequestMapping("/security/login/form")
public String loginForm(Model model) {
	model.addAttribute("message", "Vui lòng đăng nhập!");
	return "security/login";
}

@RequestMapping("/security/login/seccess")
public String loginSuccess(Model model) {
	model.addAttribute("message", "Đăng nhập thành công!");
	return "/home/home";
}

@RequestMapping("/security/login/error")
public String loginError(Model model) {
	model.addAttribute("message", "Sai thông đăng nhập!");
	return "security/login";
}

@RequestMapping("/security/unauthoried")
public String unauthoried(Model model) {
	model.addAttribute("message", "Không có quyền truy xuất!");
	return "security/login";
}

@RequestMapping("/security/logoff/success")
public String logoffSuccess(Model model) {
	model.addAttribute("message", "Bạn đã đăng xuất!");
	return "security/login";
}


}
