<?php

namespace App\Repository;

use App\Entity\Message;
use Doctrine\ODM\MongoDB\Repository\DocumentRepository;

/**
 * @extends DocumentRepository<Message>
 */
class MessageRepository extends DocumentRepository
{
    public function findByConversationId(string $conversationId, int $limit = 50, int $offset = 0): array
    {
        return $this->findBy(
            ['conversationId' => $conversationId],
            ['createdAt' => 'DESC'],
            $limit,
            $offset
        );
    }

    public function findByConversationIdBefore(string $conversationId, \DateTimeImmutable $before, int $limit = 50): array
    {
        return $this->findBy(
            [
                'conversationId' => $conversationId,
                'createdAt' => ['$lt' => $before]
            ],
            ['createdAt' => 'DESC'],
            $limit
        );
    }

    public function countByConversationId(string $conversationId): int
    {
        return $this->createQueryBuilder()
            ->field('conversationId')->equals($conversationId)
            ->getQuery()
            ->execute()
            ->count();
    }

    public function findUnreadByUserId(string $userId, string $conversationId): array
    {
        return $this->findBy([
            'conversationId' => $conversationId,
            'readBy' => ['$ne' => $userId]
        ]);
    }

    public function findBySenderId(string $senderId): array
    {
        return $this->findBy(['senderId' => $senderId]);
    }

    public function findRecentMessages(int $limit = 100): array
    {
        return $this->findBy(
            [],
            ['createdAt' => 'DESC'],
            $limit
        );
    }
}
