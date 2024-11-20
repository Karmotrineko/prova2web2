import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';

// Definição do tipo para os posts
type Post = {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: { name: string }; // Corrigido para refletir a estrutura correta
  comments?: Array<{ id: number; content: string }>; // Comentários relacionados ao post
};

type Comment = {
  id: number;
  content: string;
};

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]); // Estado para armazenar os posts
  const [loading, setLoading] = useState<boolean>(true); // Estado para o indicador de carregamento
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // Estado para o post selecionado
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Controle da visibilidade do modal
  const [comments, setComments] = useState<Comment[]>([]); // Estado para armazenar os comentários do post selecionado

  // Função para buscar os posts do backend usando fetch
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/posts'); // Substitua pela URL do seu backend
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data: Post[] = await response.json(); // Garante que o tipo é um array de posts
      setPosts(data); // Define os posts recebidos
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Função para buscar os comentários do post selecionado
  const fetchComments = async (postId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/comments?postId=${postId}`); // Filtrando comentários pelo postId
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data: Comment[] = await response.json();
      setComments(data); // Atualiza o estado com os comentários recebidos
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  // useEffect para chamar o backend quando a tela carregar
  useEffect(() => {
    fetchPosts();
  }, []);

  // Função para abrir o modal de comentários
  const openComments = (post: Post) => {
    setSelectedPost(post); // Define o post selecionado
    fetchComments(post.id); // Busca os comentários para esse post
    setModalVisible(true); // Abre o modal
  };

  // Função para renderizar cada post
  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <Text style={styles.userName}>{item.author.name}</Text> {/* Exibe o nome do autor */}
      <Text style={styles.postTitle}>{item.title}</Text> {/* Exibe o título do post */}
      <Text style={styles.postText}>{item.content}</Text> {/* Exibe o conteúdo do post */}
      <TouchableOpacity onPress={() => openComments(item)}>
        <Text style={styles.commentLink}>Ver Comentários</Text> {/* Link de comentários */}
      </TouchableOpacity>
    </View>
  );

  // Exibe um indicador de carregamento enquanto os dados não chegam
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Carregando posts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
        contentContainerStyle={styles.list}
      />

      {/* Modal para exibir comentários */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Comentários</Text>
            <FlatList
              data={comments}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Text style={styles.commentItem}>{item.content}</Text>
              )}
              ListEmptyComponent={<Text style={styles.emptyComments}>Nenhum comentário.</Text>}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange', // Fundo laranja
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
  list: {
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  postText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  commentLink: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentItem: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  emptyComments: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'orange',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
