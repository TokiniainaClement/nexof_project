<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\ODM\MongoDB\Repository\DocumentRepository;

/**
 * @extends DocumentRepository<User>
 */
class UserRepository extends DocumentRepository
{
    public function findByEmail(string $email): ?User
    {
        return $this->findOneBy(['email' => $email]);
    }

    public function findByStatus(string $status): array
    {
        return $this->findBy(['status' => $status]);
    }

    public function findActiveUsers(): array
    {
        return $this->findBy(['status' => ['$ne' => 'offline']]);
    }
}
