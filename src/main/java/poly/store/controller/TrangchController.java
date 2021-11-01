package poly.store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TrangchController {
	@RequestMapping("/home")
	public String view() {
		return "home/home";
	}
}
