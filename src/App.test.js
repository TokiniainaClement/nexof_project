
import { initializeApp } from 'firebase/app';
import * as tf from '@tensorflow/tfjs';

test('Vérification des dépendances', async () => {
  // Test TensorFlow.js
  expect(tf).toBeDefined();
  
  // Test Firebase
  const firebaseConfig = { /* config de test */ };
  const app = initializeApp(firebaseConfig);
  expect(app).toBeDefined();
});
