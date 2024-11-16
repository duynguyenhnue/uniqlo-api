import { toast } from "react-toastify";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import { TitleHelmet } from "../../components/common/title-helmet";
import { useEffect, useState } from "react";
import { ICart } from "../shop/cart";
import { API_ENDPOINT } from "../../apis/api";
import axios from "axios";
import OrderSuccessPage from "./complete";
interface IForm {
  firstName: string;
  lastName: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
}
const CheckoutPage = () => {
  const [cartData, setCartData] = useState<ICart[]>();
  const [discount, setDiscount] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [formData, setFormData] = useState<IForm>({
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
  });
  const fetchCartData = async () => {
    try {
      const res: any = await axios.get(API_ENDPOINT.INVENTORY);
      console.log(res.data);
      setCartData(res.data);
    } catch (error) {
      toast.error("Error when get cart data!");
    }
  };

  useEffect(() => {
    fetchCartData();
    if (sessionStorage.getItem("Cupon")) {
      setDiscount(Number(sessionStorage.getItem("Cupon")));
    }
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value, // Xử lý riêng cho checkbox
    }));
  };

  const handleSummitForm = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form Data:", formData);
  };

  const handlePlaceOrder = () => {
    setIsComplete(true)
  };
  return (
    <>
      <TitleHelmet title="Check Out" />
      <Header />
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Check Out</h4>
                <div className="breadcrumb__links">
                  <a href="/">Home</a>
                  <a href="/shop">Shop</a>
                  <span>Check Out</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb Section End */}
      {/* Checkout Section Begin */}
      {isComplete ? (
        <OrderSuccessPage name={`${formData.firstName} ${formData.lastName}`} phone={formData.phone} />
      ) : (
        <section className="checkout spad">
          <div className="container">
            <div className="checkout__form">
              <form onSubmit={handleSummitForm}>
                <div className="row">
                  <div className="col-lg-8 col-md-6">
                    <h6 className="coupon__code">
                      <span className="icon_tag_alt" /> Have a coupon?{" "}
                      <a href="#">Click here</a> to enter your code
                    </h6>
                    <h6 className="checkout__title">Billing Details</h6>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Fist Name<span>*</span>
                          </p>
                          <input
                            type="text"
                            value={formData.firstName}
                            name="firstName"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Last Name<span>*</span>
                          </p>
                          <input
                            type="text"
                            value={formData.lastName}
                            name="lastName"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="checkout__input">
                      <p>
                        Country<span>*</span>
                      </p>
                      <input
                        type="text"
                        value={formData.country}
                        name="country"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="checkout__input">
                      <p>
                        Address<span>*</span>
                      </p>
                      <input
                        type="text"
                        placeholder="Street Address"
                        className="checkout__input__add"
                        onChange={handleChange}
                        value={formData.address}
                        name="address"
                      />
                      <input
                        type="text"
                        placeholder="Apartment, suite, unite ect (optinal)"
                      />
                    </div>
                    <div className="checkout__input">
                      <p>
                        Town/City<span>*</span>
                      </p>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        name="city"
                      />
                    </div>
                    <div className="checkout__input">
                      <p>
                        Country/State<span>*</span>
                      </p>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={handleChange}
                        name="state"
                      />
                    </div>
                    <div className="checkout__input">
                      <p>
                        Postcode / ZIP<span>*</span>
                      </p>
                      <input
                        type="text"
                        value={formData.zip}
                        onChange={handleChange}
                        name="zip"
                      />
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Phone<span>*</span>
                          </p>
                          <input
                            type="text"
                            value={formData.phone}
                            onChange={handleChange}
                            name="phone"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="checkout__input">
                          <p>
                            Email<span>*</span>
                          </p>
                          <input
                            type="text"
                            value={formData.email}
                            onChange={handleChange}
                            name="email"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="checkout__input__checkbox">
                      <label htmlFor="acc">
                        Create an account?
                        <input type="checkbox" id="acc" />
                        <span className="checkmark" />
                      </label>
                      <p>
                        Create an account by entering the information below. If
                        you are a returning customer please login at the top of
                        the page
                      </p>
                    </div>
                    <div className="checkout__input">
                      <p>
                        Account Password<span>*</span>
                      </p>
                      <input type="text" />
                    </div>
                    <div className="checkout__input__checkbox">
                      <label htmlFor="diff-acc">
                        Note about your order, e.g, special noe for delivery
                        <input type="checkbox" id="diff-acc" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="checkout__input">
                      <p>
                        Order notes<span>*</span>
                      </p>
                      <input
                        type="text"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="checkout__order">
                      <h4 className="order__title">Your order</h4>
                      <div className="checkout__order__products">
                        Product <span>Total</span>
                      </div>
                      <ul className="checkout__total__products">
                        {cartData?.map((product: ICart, index: number) => (
                          <li>
                            {index}. {product.name}{" "}
                            <span>$ {product.price}</span>
                          </li>
                        ))}
                      </ul>
                      <ul className="checkout__total__all">
                        <li>
                          Subtotal{" "}
                          <span>
                            ${" "}
                            {cartData?.reduce(
                              (sum: number, item: ICart) => sum + item.price,
                              0
                            )}
                          </span>
                        </li>
                        <li>
                          Total{" "}
                          <span>
                            ${" "}
                            {cartData?.reduce(
                              (sum: number, item: ICart) =>
                                sum + (item.price * (100 - discount)) / 100,
                              0
                            )}
                          </span>
                        </li>
                      </ul>
                      <div className="checkout__input__checkbox">
                        <label htmlFor="acc-or">
                          Create an account?
                          <input type="checkbox" id="acc-or" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adip elit, sed
                        do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua.
                      </p>
                      <div className="checkout__input__checkbox">
                        <label htmlFor="payment">
                          Check Payment
                          <input type="checkbox" id="payment" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="checkout__input__checkbox">
                        <label htmlFor="paypal">
                          Paypal
                          <input type="checkbox" id="paypal" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="site-btn"
                        onClick={handlePlaceOrder}
                      >
                        PLACE ORDER
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};
export default CheckoutPage;
