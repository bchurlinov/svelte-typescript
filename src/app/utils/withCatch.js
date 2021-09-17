export async function withCatch(promise) {
   try {
      const data = await promise();
      console.log("error >>", err);
      return { data, error: null };
   } catch (err) {
      console.log("error >>", err);
      return { data: null, error: err };
   }
}
