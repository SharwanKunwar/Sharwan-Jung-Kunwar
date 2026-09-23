# 🪟 Windows & Microsoft Office Activation Using MAS

A simple, structured guide explaining how **Microsoft Activation Scripts (MAS)** is commonly used with Windows and Microsoft Office.

> ⚠️ **Important:** MAS is a third-party, unofficial activation tool. It is **not developed, endorsed, or supported by Microsoft**.

---

## ⚠️ Disclaimer

This guide is provided for **informational and educational purposes only**.

Using third-party activation tools may involve **security, licensing, compatibility, and system-stability risks**. You are responsible for understanding and complying with Microsoft's license terms and applicable laws.

The author of this guide:

* Does not provide or sell Microsoft licenses or product keys.
* Does not guarantee successful activation.
* Does not guarantee that third-party scripts are safe or suitable for every system.
* Is not responsible for data loss, system problems, security issues, or licensing consequences resulting from the use of third-party tools.

**For a fully supported installation, use a genuine Microsoft license and Microsoft's official activation methods.**

---

# 📋 Prerequisites

Before starting, make sure:

* ✅ Windows or Microsoft Office is already installed.
* ✅ You have an internet connection.
* ✅ Important files are backed up.
* ✅ You understand the risks of executing third-party PowerShell scripts.

### 🪟 Official Windows Download

If you need Windows installation media, use Microsoft's official website:

[Download Windows — Microsoft](https://www.microsoft.com/en-us/software-download/windows11?utm_source=chatgpt.com)

For Microsoft Office, use Microsoft's official installation resources and install the edition associated with your legitimate license.

---

# 🚀 Step-by-Step Guide

## Step 1 — Open PowerShell

Open PowerShell on your Windows computer.

1. Right-click the **Start** button.
2. Select **Windows PowerShell**.
3. Make sure you are using **PowerShell**, not Command Prompt (`CMD`).

---

## Step 2 — Run the MAS Launcher

With PowerShell open, run:

```powershell
irm https://get.activated.win | iex
```

### Follow these steps:

1. Copy the command.
2. Paste it into PowerShell.
3. Press **Enter**.
4. Wait for the MAS menu to appear.

> ⚠️ **Security Warning:**
> This command retrieves code from the internet and executes it. Because `irm ... | iex` executes remotely retrieved PowerShell code, verify the source before running it and avoid modified copies from unknown websites.

---

# Step 3 — Choose What You Want to Activate

Once the MAS menu appears, choose the option corresponding to the Microsoft product you want to work with.

---

## 🪟 Option 1 — Windows

### Step 3.1 — Select Windows

At the MAS menu, press: 1

This opens the **Windows activation** section.

### Step 3.2 — Start the Windows Process

Follow the prompts displayed by MAS.

The Windows method documented by MAS uses the **HWID** method for supported Windows editions.

Wait while the process runs and follow the instructions displayed in the PowerShell window.

### Step 3.3 — Check the Result

When the process finishes, check the Windows activation status:

**Settings → System → Activation**

Confirm the activation status displayed by Windows.

---

# 📦 Option 2 — Microsoft Office

If you want to work with Microsoft Office instead, follow these steps **in order**.

### Step 3.1 — Select Office

At the MAS menu, press: 2

This opens the **Office activation** section.

### Step 3.2 — Select Ohook

When MAS displays the available Office methods, select:

**Ohook**

Follow the prompts displayed on the screen.

### Step 3.3 — Wait for the Process to Complete

Allow the process to run until MAS finishes.

Do not close PowerShell while the process is running.

### Step 3.4 — Open Microsoft Office

After the process finishes, open an Office application such as:

* **Microsoft Word**
* **Microsoft Excel**
* **Microsoft PowerPoint**

### Step 3.5 — Check Product Information

Inside the Office application, go to:

**File → Account → Product Information**

Check the product and activation information displayed there.

---

# 🔄 Step 4 — Restart Your Computer

After completing the selected process, restart your computer if the activation process or MAS documentation recommends it.

### Restart Windows

**Start → Power → Restart**

After Windows starts again, check the activation status one more time.

### 🪟 Windows

**Settings → System → Activation**

### 📦 Office

Open Word, Excel, or another Office application:

**File → Account → Product Information**

---

# 🗺️ Complete Flow

```text
┌─────────────────────────────┐
│ Windows / Office Installed  │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│       Open PowerShell       │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│      Run MAS Launcher       │
└──────────────┬──────────────┘
               ↓
┌─────────────────────────────┐
│        MAS Menu Opens       │
└──────────────┬──────────────┘
               ↓
        ┌──────┴──────┐
        ↓             ↓
    Press 1        Press 2
    Windows         Office
        ↓             ↓
      HWID          Ohook
        ↓             ↓
   Follow prompts  Follow prompts
        ↓             ↓
   Verify Windows  Verify Office
        └──────┬──────┘
               ↓
      Restart if required
```

---

# 🔍 Verification

Always verify the result after completing the process.

### Windows

Go to:

**Settings → System → Activation**

### Microsoft Office

Open an Office application and go to:

**File → Account → Product Information**

---

# 🛡️ Security Recommendations

Before running any third-party activation script:

* 🔎 Verify the source.
* 🧾 Understand what commands are being executed.
* 🛡️ Keep Windows Security enabled.
* 💾 Back up important files.
* 🔑 Never provide your Microsoft account password to an activation tool.
* 🚫 Avoid modified copies from unknown websites.
* ⚠️ Never disable security software simply to make a script run.

---

# ❓ Frequently Asked Questions

### Is MAS an official Microsoft tool?

**No.** MAS is a third-party project and is not an official Microsoft activation utility.

### Does MAS require Windows or Office to be installed?

Yes. The relevant Microsoft product should already be installed.

### What happens after pressing `1`?

The Windows section opens. Follow the displayed prompts and, where applicable, the documented HWID method.

### What happens after pressing `2`?

The Office section opens. When prompted for the Office method, select **Ohook**, then follow the displayed prompts.

### Should I verify activation afterward?

Yes. Always check the activation/product information shown by Windows or Office rather than assuming the process completed successfully.

---

# 📌 Final Note

MAS and other third-party activation tools are separate from Microsoft's official licensing and activation systems.

If you already own a legitimate Windows or Office license, **using Microsoft's official activation process is the safest and most supportable option**.

> ⚠️ **Use third-party scripts at your own risk. Verify the code before execution, protect your credentials, and keep backups of important data.**
