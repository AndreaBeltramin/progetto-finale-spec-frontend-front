import { useState, useEffect } from "react";

export default function useProducts() {
	const apiUrl = "http://localhost:3001";
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	//fetch per ottenere la lista di tutti i prodotti
	async function fetchProducts() {
		try {
			const response = await fetch(`${apiUrl}/products`);
			const data = await response.json();
			setProducts(data);
		} catch (error) {
			console.error("Errore nel recupero dei prodotti: ", error);
		}
	}

	//fetch per otttenere un singolo prodotto
	const [product, setProduct] = useState("");

	async function showProduct(id) {
		try {
			const response = await fetch(`${apiUrl}/products/${id}`);
			const data = await response.json();
			setProduct(data.product);
		} catch (error) {
			console.error("Errore nel recupero dei prodotti: ", error);
		}
	}

	//stato per controllare i prodotti con il like
	const [likedProducts, setLikedProducts] = useState([]);

	//aggiunta prodotti ai preferiti
	function handleClick(productId) {
		//trovo il prodotto partendo dall'id
		const productClicked = products.find((p) => p.id === productId);
		// console.log(productClicked);

		//controllo se il prodotto cliccato è incluso nell'array di prodotti con il mi piace
		const isLiked = likedProducts.includes(productClicked);

		//se non era già incluso nell'array
		if (!isLiked) {
			//aggiungo il prodotto cliccato all'array di prodotti col mi piace
			setLikedProducts([...likedProducts, productClicked]);
		} else {
			//altrimenti filtro l'array dei prodotti con il mi piace togliendo il prodotto cliccato
			setLikedProducts(likedProducts.filter((p) => p.id !== productId));
		}
	}

	//funzione per controllare se un prodotto cliccato è nella lista dei prodotti col mi piace
	function isProductLiked(id) {
		const productLiked = products.find((p) => p.id === id);
		//controllo se è incluso nell'array dei prodotti col mi piace
		return likedProducts.includes(productLiked);
	}

	// funzione per recuperare i dati dell'oggetto dal titolo
	const findProductByTitle = (title) => {
		return products.find((p) => p.title === title);
	};

	// fetch per recuperare tutti i dati di un prodotto partendo dal suo ID
	async function fetchDetailProduct(productId) {
		try {
			const response = await fetch(
				`http://localhost:3001/products/${productId}`
			);
			const data = await response.json();
			// console.log(data.product);
			return data.product;
		} catch (error) {
			console.error(error);
		}
	}

	return {
		products,
		setProducts,
		product,
		setProduct,
		showProduct,
		handleClick,
		likedProducts,
		isProductLiked,
		findProductByTitle,
		fetchDetailProduct,
	};
}
