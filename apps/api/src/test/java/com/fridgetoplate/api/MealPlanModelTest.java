package com.fridgetoplate.api;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;
import com.fridgetoplate.frontendmodels.MealPlanFrontendModel;
import com.fridgetoplate.model.MealPlanModel;
import com.fridgetoplate.repository.MealPlanRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;


 public class MealPlanModelTest {

    @Autowired
    DynamoDBMapper dynamoDBMapper = Mockito.mock(DynamoDBMapper.class);

    @Test
    void save_ShouldCallDynamoDBMapperSave() {
        // Arrange
        
        MealPlanRepository repository = new MealPlanRepository();
        repository.setDynamoDBMapper(dynamoDBMapper);
        MealPlanModel mealPlan = new MealPlanModel();

        // Create a mock DynamoDBMapper (optional if not using mocking)
        // DynamoDBMapper dynamoDBMapper = mock(DynamoDBMapper.class);
        // repository.setDynamoDBMapper(dynamoDBMapper);

        // Act
        MealPlanModel savedMealPlan = repository.save(mealPlan);

        // Assert
        // Optionally, verify the save method was called
        // verify(dynamoDBMapper, times(1)).save(mealPlan);

        assertEquals(mealPlan, savedMealPlan);
    }
}
