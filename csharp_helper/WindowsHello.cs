
using System;
using System.Threading.Tasks;
using Windows.Security.Credentials;
using Windows.Storage.Streams;

namespace WindowsHelloHelper
{
    public class WindowsHello
    {
        public static async Task<bool> IsWindowsHelloAvailableAsync()
        {
            try
            {
                return await KeyCredentialManager.IsSupportedAsync();
            }
            catch (Exception)
            {
                return false;
            }
        }

        public static async Task<string> VerifyUserAsync(string message)
        {
            try
            {
                KeyCredentialRetrievalResult result = await KeyCredentialManager.RequestCreateAsync(message, KeyCredentialCreationOption.ReplaceExisting);

                if (result.Status == KeyCredentialStatus.Success)
                {
                    // In a real application, you would get a public key and a signature.
                    // For this example, we'll just return a success message.
                    return "Success";
                }
                else
                {
                    return result.Status.ToString();
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
