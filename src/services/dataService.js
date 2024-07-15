function getSession() {
    const token = sessionStorage.getItem("token");
    const cbid = sessionStorage.getItem("cbid");

    return { token: token, id: cbid }
}

export async function getUser() {
    const {token, id} = getSession();

    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}` }
    }
    
    const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${id}`, requestOptions);
    if (!response.ok) {
        // eslint-disable-next-line
        throw { message: response.statusText, status: response.status };
    }
    const data = await response.json();
    return data;
}

export async function getUserOrders() {
    const {token, id} = getSession();

    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${id}`, {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        // eslint-disable-next-line
        throw { message: response.statusText, status: response.status };
    }
      const data = await response.json();
      return data;
}

export async function createOrder(cartList, total, user) {
    const {token} = getSession();
    
    const order = {
        cartList: cartList,
        amount_paid: total,
        quantity: cartList.length,
        user: {
            name: user.name,
            email: user.email,
            id: user.id,
        }
    }
    
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders/`, {
        method: "POST",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
        body: JSON.stringify(order)
    });

    if (!response.ok) {
        // eslint-disable-next-line
        throw { message: response.statusText, status: response.status };
    }
    const data = await response.json();

    return data;
}