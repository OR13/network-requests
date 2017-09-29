
import {fetchPromise} from './fetch'
it("renders without crashing", async () => {
  let response = await fetchPromise();
  expect(response.name).toBe("Luke Skywalker");
});
