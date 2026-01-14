<?php

namespace App\Repository;

use App\Entity\Conversation;
use Doctrine\ODM\MongoDB\Repository\DocumentRepository;

/**
 * @extends DocumentRepository<Conversation>
 */
class ConversationRepository extends DocumentRepository
{
    public function findByUserId(string $userId): array
    {
        return $this->findBy([
            'participants.userId' => $userId,
            'isActive' => true
        ]);
    }

    public function findDirectConversation(string $userId1, string $userId2): ?Conversation
    {
        return $this->findOneBy([
            'type' => 'direct',
            'participants' => [
                '$all' => [
                    ['$elemMatch' => ['userId' => $userId1]],
                    ['$elemMatch' => ['userId' => $userId2]]
                ]
            ]
        ]);
    }

    public function findGroupConversations(): array
    {
        return $this->findBy([
            'type' => 'group',
            'isActive' => true
        ]);
    }

    public function findPublicConversations(): array
    {
        return $this->findBy([
            'type' => 'group',
            'settings.isPublic' => true,
            'isActive' => true
        ]);
    }
}
