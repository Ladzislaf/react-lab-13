## Задание 1

Модифицируйте компонент каталога товаров Catalog, добавив каждому товару кнопку для добавления его в корзину.

При нажатии на кнопку добавления в корзину выведите, используя портал, модальное окно с уведомлением о том, что товар был успешно добавлен в корзину, а также добавьте запись об этом товаре в хранилище Redux. Модальное окно должно содержать:

- название товара,
- стоимость,
- колчество товаров в корзине,
- суммарная стоимость товаров в корзине,
- кнопки «Перейти к оформлению заказа» (пока не функциональна) и «Продолжить просмотр товаров» (закрывает модальное окно).

## Задание 2

Создайте компонент формы авторизации SignInForm, содержащий поля для ввода адреса электронной почты и пароля. Интегрируйте его с компонентом SignUpForm. Если регистрация прошла успешно, поместите данные об аккаунте пользователя в хранилище Redux и предложите пользователю ввести адрес почты и пароль для входа. Если введённые адрес почты и пароль совпадают со значениями в хранилище, выведите сообщение о том, что вход прошёл успешно, если же не совпадают, сообщите об этом и предложите ввести их заново.