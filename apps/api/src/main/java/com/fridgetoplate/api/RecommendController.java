package com.fridgetoplate.api;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.fridgetoplate.repository.RecipeRepository;
import com.fridgetoplate.model.Recipe;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE })
@RequestMapping("/recommend")
public class RecommendController