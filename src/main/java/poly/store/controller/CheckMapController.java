package poly.store.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CheckMapController {
	@RequestMapping("/checkmap/map")
	public String view() {
		return "checkmap/map";
	}
}
