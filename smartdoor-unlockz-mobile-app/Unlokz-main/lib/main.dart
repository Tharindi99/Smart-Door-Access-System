import 'package:flutter/material.dart';
import 'package:unlokz/IntroScreens/intro_screen1.dart';
import 'package:unlokz/IntroScreens/intro_screen2.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:unlokz/home_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'UNLOKZ',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
      ),
      home: const IntroSplashWrapper(),
    );
  }
}

class IntroSplashWrapper extends StatefulWidget {
  const IntroSplashWrapper({super.key});

  @override
  State<IntroSplashWrapper> createState() => _IntroSplashWrapperState();
}

class _IntroSplashWrapperState extends State<IntroSplashWrapper> {
  late bool? _isNewUser;

  @override
  void initState() {
    super.initState();
    _checkIntroStatus();
  }

  Future<void> _checkIntroStatus() async {
    final prefs = await SharedPreferences.getInstance();
    final seenIntro = prefs.getBool('seen_intro') ?? false;
    setState(() {
      _isNewUser = !seenIntro;
    });
    await Future.delayed(const Duration(seconds: 2));
    if (seenIntro) {
      Navigator.of(
        context,
      ).pushReplacement(MaterialPageRoute(builder: (_) => const HomeScreen()));
    } else {
      await prefs.setBool('seen_intro', true);
      Navigator.of(
        context,
      ).pushReplacement(MaterialPageRoute(builder: (_) => IntroScreen2()));
    }
  }

  @override
  Widget build(BuildContext context) {
    // Show splash while loading
    return const IntroScreen1();
  }
}
