---
title: "Print from GNU/Linux to Windows"
date: 2025-10-27T10:07:39-03:00
tags: ['linux']
---

Perfect — let’s set this up entirely **from the command line**, no GUI or web interface.
You’ll connect to a **Windows shared printer (SMB)** and register it in **CUPS** so you can use it with `lp` or `lpr`.

---

## 🧰 1. Install required tools

Install CUPS and Samba support for SMB printers:

**Debian/Ubuntu:**

```bash
sudo apt install cups smbclient
```

**Arch / Manjaro:**

```bash
sudo pacman -S cups samba
```

**Fedora:**

```bash
sudo dnf install cups samba-client
```

---

## ⚙️ 2. Start and enable CUPS

```bash
sudo systemctl enable --now cups
```

---

## 🔍 3. Check the shared printer on the Windows host

You can discover what printers are shared:

```bash
smbclient -L //WINDOWS_HOST_IP -U WINDOWS_USER
```

Example:

```bash
smbclient -L //192.168.1.100 -U Administrator
```

You should see something like:

```
Sharename       Type      Comment
---------       ----      -------
HP_LaserJet     Printer   Office printer
```

So the printer URI will be:

```
smb://192.168.1.100/HP_LaserJet
```

---

## 🖨️ 4. Add the printer to CUPS from the CLI

You’ll use `lpadmin`:

```bash
sudo lpadmin -p HP_LaserJet \
  -v smb://username:password@192.168.1.100/HP_LaserJet \
  -E \
  -m everywhere
```

Explanation:

* `-p HP_LaserJet` → Printer name in CUPS
* `-v` → Device URI (SMB path)
* `-E` → Enable the printer and accept jobs
* `-m everywhere` → Use IPP Everywhere or a generic PPD driver

📝 If you prefer to avoid storing a password in the URI, omit it:

```bash
sudo lpadmin -p HP_LaserJet -v smb://username@192.168.1.100/HP_LaserJet -E -m everywhere
```

CUPS will prompt for credentials when needed.

---

## ✅ 5. Verify the printer

```bash
lpstat -p
lpstat -d
```

You should see your new printer listed and enabled.

---

## 🧪 6. Print a test file

For example:

```bash
echo "Test page from Linux" | lp -d HP_LaserJet
```

Or print a file:

```bash
lp -d HP_LaserJet /etc/hosts
```

---

## 🔒 7. (Optional) Store credentials

If Windows requires authentication and you want to **avoid prompts**, you can store credentials in the Samba config:

Edit `/etc/samba/smb.conf` and add:

```ini
[global]
   client min protocol = SMB2
   client max protocol = SMB3
   client plaintext auth = no
   name resolve order = bcast host
   workgroup = WORKGROUP
```

Then store credentials in:

```
~/.smbcredentials
```

```ini
username=your_windows_username
password=your_password
```

Set permissions:

```bash
chmod 600 ~/.smbcredentials
```

And use:

```bash
sudo lpadmin -p HP_LaserJet -v smb://:@192.168.1.100/HP_LaserJet -E -m everywhere
```

CUPS will automatically pick up your stored credentials via Samba.

---

## 🧰 Bonus: Default printer

If you want to make it your default printer:

```bash
lpoptions -d HP_LaserJet
```

---

Would you like me to show how to **print with authentication automatically** using Kerberos or domain credentials (useful for office networks)?

