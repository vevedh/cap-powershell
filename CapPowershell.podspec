
  Pod::Spec.new do |s|
    s.name = 'CapPowershell'
    s.version = '0.0.1'
    s.summary = 'Plugin PowerShell Capacitor'
    s.license = 'MIT'
    s.homepage = 'http://github.com/vevedh/cap-powershell.git'
    s.author = 'Hervé de CHAVIGNY'
    s.source = { :git => 'http://github.com/vevedh/cap-powershell.git', :tag => s.version.to_s }
    s.source_files = 'ios/Plugin/**/*.{swift,h,m,c,cc,mm,cpp}'
    s.ios.deployment_target  = '11.0'
    s.dependency 'Capacitor'
  end