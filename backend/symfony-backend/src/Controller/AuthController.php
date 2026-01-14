<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

final class AuthController extends AbstractController
{

    #[Route('/api/auth/signup', name: 'api_auth_signup', methods: ['POST'])]
    public function signup(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data || !isset($data['email']) || !isset($data['password'])) {
            return $this->json(['message' => 'Email et mot de passe requis'], 400);
        }

        $email = $data['email'];
        $password = $data['password'];

        if (strlen($password) < 6) {
            return $this->json(['message' => 'Le mot de passe doit contenir au moins 6 caractères'], 400);
        }

        // Placeholder - MongoDB integration pending
        return $this->json([
            'message' => 'Signup endpoint - MongoDB integration pending',
            'email' => $email
        ], 200);
    }

    #[Route('/api/auth/login', name: 'api_auth_login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data || !isset($data['email']) || !isset($data['password'])) {
            return $this->json(['message' => 'Email et mot de passe requis'], 400);
        }

        // Placeholder - MongoDB integration pending
        return $this->json([
            'message' => 'Login endpoint - MongoDB integration pending',
            'email' => $data['email']
        ], 200);
    }

    #[Route('/api/auth/face-register', name: 'api_auth_face_register', methods: ['POST'])]
    public function faceRegister(Request $request): JsonResponse
    {
        // Placeholder - MongoDB integration pending
        return $this->json(['message' => 'Face registration - MongoDB integration pending'], 200);
    }

    #[Route('/api/auth/face-verify', name: 'api_auth_face_verify', methods: ['POST'])]
    public function faceVerify(Request $request): JsonResponse
    {
        // Placeholder - MongoDB integration pending
        return $this->json(['message' => 'Face verification - MongoDB integration pending'], 200);
    }

    #[Route('/api/user/profile', name: 'api_user_profile', methods: ['GET'])]
    public function profile(): JsonResponse
    {
        // Placeholder - MongoDB integration pending
        return $this->json(['message' => 'User profile - MongoDB integration pending'], 200);
    }
}
