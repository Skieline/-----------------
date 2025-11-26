import express from "express";

const app = express();
const port = 3000;

// Где-то тут можно подключиться к базе данных

// Где-то тут можно написать схему для таблицы и автоматически синхронизировать ее

// Это роут для того чтобы понимать жив или мертв сервис
//       |
//       v - вот тут по факту "ручка", сервер проверяет пришедший адрес с каждой ручкой по очереди
app.get("/", (req, res) => {
  res.status(200).send({
    status: "ok",
    uptime: process.uptime(),
  });
});

// Пример для начала
app.get("/:word", async (req, res, next) => {
  try {
    // Тут будет обращение к базе данных со всей логикой

    // Тут пример если хочешь вызвать ошибку. Внутри соответственно содержание
    // Буквально делаем  (ノಠ益ಠ)ノ彡┻━┻
    throw new Error("┻━┻"); // Раскомменть меня если хочешь посмотреть как это работает

    return res.send({
      data: { word: req.params.word, count: Math.random() * 100 },
    });
  } catch (error) {
    // (ノಠ益ಠ)ノ彡┻━┻
    // На случай если все идет по одному месту отправляем запрос далее
    //    ┻━┻ ︵╰(°□°╰)
    next(error);
  }
});
//       ┻━┻
//        |
//        |
//        v
//       ┻━┻
// Глобальный хендлер для ошибок. Если запрос не выполнился где-то в предыдущих app.* то он дойдет сюда
app.use((err, req, res, next) => {
  //            ┻━┻
  console.error(err.stack);
  res
    .status(500)
    .send({ message: "Oooooops TABLE IS COMING", cause: err.message });
});

app.listen(port, () => {
  console.log(`Lesson 1 app listening on port ${port}`);
});
