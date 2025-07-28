import 'package:flutter/material.dart';

class DoorOpenScreen extends StatefulWidget {
  const DoorOpenScreen({super.key});

  @override
  State<DoorOpenScreen> createState() => _DoorOpenScreenState();
}

class _DoorOpenScreenState extends State<DoorOpenScreen> {
  bool isEmployee = true;

  // Employee controllers
  final TextEditingController _empUsernameController = TextEditingController();
  final TextEditingController _empPasswordController = TextEditingController();
  final TextEditingController _empDoorNumberController = TextEditingController();

  // Guest controllers
  final TextEditingController _guestDoorIdController = TextEditingController();
  final TextEditingController _guestVisitorIdController = TextEditingController();
  final TextEditingController _guestPinController = TextEditingController();

  @override
  void dispose() {
    _empUsernameController.dispose();
    _empPasswordController.dispose();
    _empDoorNumberController.dispose();
    _guestDoorIdController.dispose();
    _guestVisitorIdController.dispose();
    _guestPinController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFE0F7FA),
      appBar: AppBar(
        title: const Text('Open Door'),
        backgroundColor: const Color(0xFFE0F7FA),
        elevation: 0,
        foregroundColor: Colors.black,
      ),
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Toggle buttons
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      _buildToggleButton('Employee', isEmployee, () {
                        setState(() => isEmployee = true);
                      }),
                      const SizedBox(width: 16),
                      _buildToggleButton('Guest', !isEmployee, () {
                        setState(() => isEmployee = false);
                      }),
                    ],
                  ),
                  const SizedBox(height: 32),
                  if (isEmployee) _buildEmployeeForm(),
                  if (!isEmployee) _buildGuestForm(),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildToggleButton(String label, bool selected, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 12),
        decoration: BoxDecoration(
          color: selected ? Colors.black : Colors.white,
          borderRadius: BorderRadius.circular(24),
          border: Border.all(color: Colors.black, width: 2),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: selected ? Colors.white : Colors.black,
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
      ),
    );
  }

  Widget _buildEmployeeForm() {
    return Column(
      children: [
        TextField(
          controller: _empUsernameController,
          decoration: const InputDecoration(
            labelText: 'Username',
            border: OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: 16),
        TextField(
          controller: _empPasswordController,
          obscureText: true,
          decoration: const InputDecoration(
            labelText: 'Password',
            border: OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: 16),
        TextField(
          controller: _empDoorNumberController,
          decoration: const InputDecoration(
            labelText: 'Door Number',
            border: OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: 24),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.black,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              padding: const EdgeInsets.symmetric(vertical: 16),
            ),
            onPressed: () {},
            child: const Text(
              'Open Door',
              style: TextStyle(fontSize: 18, color: Colors.white),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildGuestForm() {
    return Column(
      children: [
        TextField(
          controller: _guestDoorIdController,
          decoration: const InputDecoration(
            labelText: 'Door ID',
            border: OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: 16),
        TextField(
          controller: _guestVisitorIdController,
          decoration: const InputDecoration(
            labelText: 'Visitor ID',
            border: OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: 16),
        TextField(
          controller: _guestPinController,
          obscureText: true,
          decoration: const InputDecoration(
            labelText: 'PIN',
            border: OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: 24),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.black,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              padding: const EdgeInsets.symmetric(vertical: 16),
            ),
            onPressed: () {},
            child: const Text(
              'Open Door',
              style: TextStyle(fontSize: 18, color: Colors.white),
            ),
          ),
        ),
      ],
    );
  }
} 