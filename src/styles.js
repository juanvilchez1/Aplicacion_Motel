import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3', // gris claro
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30, // más grande para destacar el nombre de la app
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000', // texto negro para contraste
    textAlign: 'center',
  },
  text: {
    fontSize: 18, // mediano para explicaciones
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#228B22', // verde
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%', // todos los botones del mismo ancho
    alignSelf: 'center', // centrados
  },
  buttonText: {
    color: '#fff', // texto blanco
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    backgroundColor: '#fff',
    borderColor: '#228B22',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});