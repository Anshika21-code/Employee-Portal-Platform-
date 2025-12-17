import pickle
import numpy as np
import os

class OnboardingPredictor:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.load_model()
    
    def load_model(self):
        """Load the trained model and scaler"""
        try:
            with open('model.pkl', 'rb') as f:
                self.model = pickle.load(f)
            
            with open('scaler.pkl', 'rb') as f:
                self.scaler = pickle.load(f)
            
            print(" ML Model loaded successfully")
        except FileNotFoundError:
            print(" Model not found. Please train the model first.")
            self.model = None
            self.scaler = None
    
    def predict_status(self, completion_rate, days_elapsed, overdue_tasks, avg_time_per_task):
        """
        Predict employee onboarding status
        
        Args:
            completion_rate: Percentage of tasks completed (0-1)
            days_elapsed: Days since onboarding started
            overdue_tasks: Number of overdue tasks
            avg_time_per_task: Average days per task
        
        Returns:
            dict with status and confidence
        """
        if self.model is None:
            # Fallback to rule-based prediction
            return self._rule_based_prediction(completion_rate, overdue_tasks)
        
        # Prepare features
        features = np.array([[completion_rate, days_elapsed, overdue_tasks, avg_time_per_task]])
        
        # Scale features
        features_scaled = self.scaler.transform(features)
        
        # Predict
        prediction = self.model.predict(features_scaled)[0]
        probabilities = self.model.predict_proba(features_scaled)[0]
        
        # Get confidence (probability of predicted class)
        confidence = max(probabilities) * 100
        
        # Get recommendations
        recommendations = self._get_recommendations(prediction, completion_rate, overdue_tasks)
        
        return {
            'status': prediction,
            'confidence': round(confidence, 2),
            'recommendations': recommendations,
            'probabilities': {
                'on-track': round(probabilities[2] * 100, 2) if len(probabilities) > 2 else 0,
                'at-risk': round(probabilities[0] * 100, 2) if len(probabilities) > 0 else 0,
                'delayed': round(probabilities[1] * 100, 2) if len(probabilities) > 1 else 0
            }
        }
    
    def _rule_based_prediction(self, completion_rate, overdue_tasks):
        """Fallback rule-based prediction if model not available"""
        if completion_rate > 0.7 and overdue_tasks <= 1:
            status = 'on-track'
        elif completion_rate < 0.5 or overdue_tasks >= 3:
            status = 'delayed'
        else:
            status = 'at-risk'
        
        return {
            'status': status,
            'confidence': 75.0,
            'recommendations': self._get_recommendations(status, completion_rate, overdue_tasks),
            'probabilities': {'on-track': 0, 'at-risk': 0, 'delayed': 0}
        }
    
    def _get_recommendations(self, status, completion_rate, overdue_tasks):
        """Generate recommendations based on status"""
        recommendations = []
        
        if status == 'delayed':
            recommendations.append(" Immediate attention required")
            recommendations.append("Schedule 1-on-1 meeting with HR")
            if overdue_tasks > 0:
                recommendations.append(f"Focus on completing {overdue_tasks} overdue tasks")
        
        elif status == 'at-risk':
            recommendations.append(" Monitor progress closely")
            recommendations.append("Check if employee needs support")
            if completion_rate < 0.6:
                recommendations.append("Consider extending deadlines")
        
        else:  # on-track
            recommendations.append(" Employee is progressing well")
            recommendations.append("Continue current pace")
        
        return recommendations

# Global predictor instance
predictor = OnboardingPredictor()