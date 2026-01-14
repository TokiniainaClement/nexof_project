<?php

namespace App\Entity;

use App\Repository\ConversationRepository;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

#[ODM\Document(repositoryClass: ConversationRepository::class)]
class Conversation
{
    #[ODM\Id]
    private ?string $id = null;

    #[ODM\Field(type: 'string')]
    private ?string $type = null; // 'direct' or 'group'

    #[ODM\Field(type: 'string')]
    private ?string $name = null;

    #[ODM\Field(type: 'string')]
    private ?string $description = null;

    #[ODM\Field(type: 'collection')]
    private array $participants = []; // Array of participant data

    #[ODM\ReferenceOne(targetDocument: User::class)]
    private ?User $createdBy = null;

    #[ODM\Field(type: 'hash')]
    private array $settings = [
        'isPublic' => false,
        'allowInvites' => true
    ];

    #[ODM\Field(type: 'hash')]
    private ?array $lastMessage = null;

    #[ODM\Field(type: 'int')]
    private int $messageCount = 0;

    #[ODM\Field(type: 'bool')]
    private bool $isActive = true;

    #[ODM\Field(type: 'date')]
    private ?\DateTimeImmutable $createdAt = null;

    #[ODM\Field(type: 'date')]
    private ?\DateTimeImmutable $updatedAt = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
        $this->participants = [];
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;
        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;
        return $this;
    }

    public function getParticipants(): array
    {
        return $this->participants;
    }

    public function setParticipants(array $participants): static
    {
        $this->participants = $participants;
        return $this;
    }

    public function addParticipant(string $userId, string $role = 'member'): bool
    {
        foreach ($this->participants as $participant) {
            if ($participant['userId'] === $userId) {
                return false; // Already exists
            }
        }

        $this->participants[] = [
            'userId' => $userId,
            'role' => $role,
            'joinedAt' => new \DateTimeImmutable()
        ];

        return true;
    }

    public function removeParticipant(string $userId): bool
    {
        foreach ($this->participants as $key => $participant) {
            if ($participant['userId'] === $userId) {
                unset($this->participants[$key]);
                $this->participants = array_values($this->participants); // Reindex
                return true;
            }
        }
        return false;
    }

    public function getCreatedBy(): ?User
    {
        return $this->createdBy;
    }

    public function setCreatedBy(User $createdBy): static
    {
        $this->createdBy = $createdBy;
        return $this;
    }

    public function getSettings(): array
    {
        return $this->settings;
    }

    public function setSettings(array $settings): static
    {
        $this->settings = $settings;
        return $this;
    }

    public function getLastMessage(): ?array
    {
        return $this->lastMessage;
    }

    public function setLastMessage(?array $lastMessage): static
    {
        $this->lastMessage = $lastMessage;
        return $this;
    }

    public function getMessageCount(): int
    {
        return $this->messageCount;
    }

    public function setMessageCount(int $messageCount): static
    {
        $this->messageCount = $messageCount;
        return $this;
    }

    public function incrementMessageCount(): static
    {
        $this->messageCount++;
        return $this;
    }

    public function isActive(): bool
    {
        return $this->isActive;
    }

    public function setIsActive(bool $isActive): static
    {
        $this->isActive = $isActive;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): static
    {
        $this->updatedAt = $updatedAt;
        return $this;
    }

    public function getUnreadCount(string $userId): int
    {
        // This would need to be implemented with a separate unread messages tracking
        // For now, return 0
        return 0;
    }
}
