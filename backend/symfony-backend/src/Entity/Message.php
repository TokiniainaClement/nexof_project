<?php

namespace App\Entity;

use App\Repository\MessageRepository;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

#[ODM\Document(repositoryClass: MessageRepository::class)]
class Message
{
    #[ODM\Id]
    private ?string $id = null;

    #[ODM\Field(type: 'string')]
    private ?string $conversationId = null;

    #[ODM\ReferenceOne(targetDocument: User::class)]
    private ?User $senderId = null;

    #[ODM\Field(type: 'string')]
    private ?string $content = null;

    #[ODM\Field(type: 'string')]
    private ?string $messageType = 'text'; // 'text', 'image', 'file', 'voice', 'system'

    #[ODM\Field(type: 'bool')]
    private bool $isAI = false;

    #[ODM\Field(type: 'hash')]
    private ?array $metadata = null; // For file info, voice duration, etc.

    #[ODM\Field(type: 'collection')]
    private array $readBy = []; // Array of user IDs who have read the message

    #[ODM\Field(type: 'collection')]
    private array $reactions = []; // Array of reaction objects

    #[ODM\Field(type: 'string')]
    private ?string $replyTo = null; // ID of message this is replying to

    #[ODM\Field(type: 'date')]
    private ?\DateTimeImmutable $createdAt = null;

    #[ODM\Field(type: 'date')]
    private ?\DateTimeImmutable $updatedAt = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->updatedAt = new \DateTimeImmutable();
        $this->readBy = [];
        $this->reactions = [];
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getConversationId(): ?string
    {
        return $this->conversationId;
    }

    public function setConversationId(string $conversationId): static
    {
        $this->conversationId = $conversationId;
        return $this;
    }

    public function getSenderId(): ?User
    {
        return $this->senderId;
    }

    public function setSenderId(?User $senderId): static
    {
        $this->senderId = $senderId;
        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;
        return $this;
    }

    public function getMessageType(): ?string
    {
        return $this->messageType;
    }

    public function setMessageType(string $messageType): static
    {
        $this->messageType = $messageType;
        return $this;
    }

    public function isAI(): bool
    {
        return $this->isAI;
    }

    public function setIsAI(bool $isAI): static
    {
        $this->isAI = $isAI;
        return $this;
    }

    public function getMetadata(): ?array
    {
        return $this->metadata;
    }

    public function setMetadata(?array $metadata): static
    {
        $this->metadata = $metadata;
        return $this;
    }

    public function getReadBy(): array
    {
        return $this->readBy;
    }

    public function setReadBy(array $readBy): static
    {
        $this->readBy = $readBy;
        return $this;
    }

    public function addReadBy(string $userId): static
    {
        if (!in_array($userId, $this->readBy)) {
            $this->readBy[] = $userId;
        }
        return $this;
    }

    public function getReactions(): array
    {
        return $this->reactions;
    }

    public function setReactions(array $reactions): static
    {
        $this->reactions = $reactions;
        return $this;
    }

    public function addReaction(string $userId, string $emoji): static
    {
        $this->reactions[] = [
            'userId' => $userId,
            'emoji' => $emoji,
            'timestamp' => new \DateTimeImmutable()
        ];
        return $this;
    }

    public function getReplyTo(): ?string
    {
        return $this->replyTo;
    }

    public function setReplyTo(?string $replyTo): static
    {
        $this->replyTo = $replyTo;
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
}
