import pyautogui
import time
from AppOpener import open
def run_accurig():
    try:
       
        # type: ignore
        open("ActorCore AccuRIG")
        time.sleep(7)
        # 1. Click "Choose File"
        print("Clicking 'Choose File'...")
        pyautogui.click(x=1198, y=490)  # Replace (x, y) with actual coordinates
        time.sleep(6)

        # 2. Select the file in the file dialog
        print("Selecting the file...")
        pyautogui.write(r"C:\Users\codec\Desktop\Genemate\CLI_output\13_Texturing")
        # Replace with the actual file path
        pyautogui.click(x=308, y=235)
        pyautogui.press('enter')
        time.sleep(5)

        # 3. Click "Rig Body"
        print("Clicking 'Rig Body'...")
        pyautogui.click(x=1708, y=978)  # Replace with actual coordinates of 'Rig Body'
        time.sleep(18)

        # 4. Click "Rig Right Hand" -> "Next"
        print("Clicking 'Rig Right Hand'...")
        pyautogui.click(x=1803, y=978)  # Replace with actual coordinates of 'Rig Right Hand'
        pyautogui.click(x=885, y=581)  # Replace with actual coordinates of 'Next'
        time.sleep(25)

        # 5. Click "Rig Left Hand" -> "Finalize Character"
        print("Clicking 'Rig Left Hand'...")
        pyautogui.click(x=1803, y=978)  # Replace with actual coordinates of 'Rig Left Hand'
        pyautogui.click(x=1803, y=978)  # Replace with actual coordinates of 'Finalize Character'
        time.sleep(30)

        # 6. Click "Export" -> "Export FBX..." -> "Export"
        print("Exporting...")
        pyautogui.click(x=1708, y=978)  # Replace with actual coordinates of 'Export'
        pyautogui.click(x=958, y=464)  # Replace with actual coordinates of 'Export FBX...'
        pyautogui.click(x=867, y=765)  # Replace with actual coordinates of 'Export'
        time.sleep(2)

        # 7. Handle "Save As" dialog: type "abcd" and save
        print("Saving file...")
        pyautogui.write(r"C:\Users\codec\Desktop\project\backend\rigged")
        pyautogui.press('enter')
        time.sleep(3)

        # 8. Close the window
        print("Closing the app...")
        pyautogui.hotkey('alt', 'f4')  # Close the app using Alt+F4
        print("Process completed successfully!")

    except Exception as e:
        print(f"Error during automation: {e}")


