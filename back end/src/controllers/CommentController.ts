import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import AiConversation from '../utils/AiAnalisys';

const prisma = new PrismaClient();

class CommentController {
  constructor() {}

  // Listar todos os comentários ou filtrar por postId
  async listComments(req: Request, res: Response) {
    const { postId } = req.query; // Recebe o postId como parâmetro opcional na query

    try {
        const comments = await prisma.comment.findMany({
            where: {
              postId: postId ? Number(postId) : undefined, // Filtra por postId, se fornecido
            },
            include: {
              author: { select: { id: true, name: true, email: true } }, // Inclui dados do autor
              post: { select: { id: true, title: true, content: true } }, // Inclui dados do post
            },
          });

      res.json(comments);
    } catch (error) {
      console.error('Erro ao listar comentários:', error);
      return res.status(500).json({ error: 'Erro ao listar comentários' });
    }
  }

  // Criar um novo comentário
  async createComment(req: Request, res: Response) {
    const commentData = req.body;

    try {
      // Processamento de texto com a IA
      const response = await AiConversation(commentData.content).then();
      const evaluation = JSON.parse(response);

      // Criação do comentário com avaliação
      const newComment = await prisma.comment.create({
        data: {
          ...commentData,
          evaluation: evaluation.classificação,
        },
      });

      console.log('Comentário criado com sucesso');
      res.json({
        status: 200,
        newComment,
      });
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
      res.status(500).json({ error: 'Erro ao criar comentário' });
    }
  }

  // Atualizar um comentário
  async updateComment(req: Request, res: Response) {
    const commentData = req.body;
    const commentId = req.params.id;

    try {
      const updatedComment = await prisma.comment.update({
        where: {
          id: Number(commentId),
        },
        data: commentData,
      });

      console.log('Comentário atualizado com sucesso');
      res.json({
        status: 200,
        updatedComment,
      });
    } catch (error) {
      console.error('Erro ao atualizar comentário:', error);
      res.status(500).json({ error: 'Erro ao atualizar comentário' });
    }
  }

  // Excluir um comentário
  async deleteComment(req: Request, res: Response) {
    const commentId = req.params.id;

    try {
      const deletedComment = await prisma.comment.delete({
        where: {
          id: Number(commentId),
        },
      });

      res.json({
        status: 200,
        deletedComment,
      });
    } catch (error) {
      console.error('Erro ao deletar comentário:', error);
      res.status(500).json({ error: 'Erro ao deletar comentário' });
    }
  }

  // Deletar todos os comentários (Nuke)
  async nukeComments(req: Request, res: Response) {
    try {
      await prisma.comment.deleteMany();
      res.status(200).json({ message: 'Todos os comentários foram obliterados!' });
    } catch (error) {
      console.error('Erro ao obliterar comentários:', error);
      res.status(500).json({ error: 'Erro ao obliterar comentários' });
    }
  }
}

export default new CommentController();
